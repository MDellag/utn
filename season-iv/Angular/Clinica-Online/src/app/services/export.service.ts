import { Injectable } from '@angular/core'
import { saveAs } from 'file-saver'
import {
  PDFDocument,
  StandardFonts,
  rgb,
  SaveOptions,
  PDFPageDrawTextOptions,
  PDFImage,
  PDFFont,
  PDFPage,
} from 'pdf-lib'
import { HistoriaClinica } from '../interfaces/historiaClinica'

@Injectable({
  providedIn: 'root',
})
export class ExportService {
  constructor() {}

  downloadFile(data: any, name: string) {
    const replacer = (key: any, value: any) => (value === null ? '' : value) // specify how you want to handle null values here
    const header = Object.keys(data[0])
    let csv = data.map((row: any) =>
      header
        .map((fieldName) => JSON.stringify(row[fieldName], replacer))
        .join(',')
    )
    csv.unshift(header.join(','))
    let csvArray = csv.join('\r\n')

    var blob = new Blob([csvArray], { type: 'text/csv' })
    saveAs(blob, name + '.csv')
  }

  async downloadPDF(historiasClinicas: any, name: string) {
    // Create a new PDFDocument
    const pdfDoc = await PDFDocument.create()

    // Embed the Times Roman font
    const timesRomanFont = await pdfDoc.embedFont(StandardFonts.TimesRoman)

    // Add a blank page to the document
    const page = pdfDoc.addPage()

    // Get the width and height of the page
    const { width, height } = page.getSize()

    let i = 4
    const img = await this.generatePdfImage(pdfDoc)
    const pngDim = img.scale(1)

    page.drawImage(img, {
      x: 50,
      y: page.getHeight() - i * 16,
      width: pngDim.width,
      height: pngDim.height,
    })

    page.drawText('Historia Clinica', {
      x: 250,
      y: height - i * 16,
      size: 30,
      font: timesRomanFont,
      color: rgb(0, 0.0, 0.0),
    })

    const date = new Date()
    page.drawText(
      `${date.toLocaleDateString('es-AR')} - ${date.toLocaleTimeString(
        'es-AR'
      )}`,
      {
        x: 400,
        y: height - 6 * 16,
        size: 16,
        font: timesRomanFont,
        color: rgb(0, 0.0, 0.0),
      }
    )

    i += 4

    await this.setDataToPDF(
      i,
      historiasClinicas,
      timesRomanFont,
      width,
      height,
      page
    )

    const pdfBytes = await pdfDoc.save()
    const blob = new Blob([pdfBytes])
    saveAs(blob, name)
  }

  private async generatePdfImage(pdf: PDFDocument) {
    const image = 'assets/images/logo.png'
    const imageBytes = await fetch(image).then((res) => res.arrayBuffer())
    const pdfimage = pdf.embedPng(imageBytes)
    return pdfimage
  }

  private async setDataToPDF(
    x: number,
    historiasClinicas: any,
    font: PDFFont,
    width: number,
    height: number,
    page: PDFPage
  ) {
    let i = x
    let extra = false
    const fontSize = 16
    for (const hist of historiasClinicas) {
      for (let key of Object.keys(hist)) {
        const options: PDFPageDrawTextOptions = {
          x: 50,
          y: height - i * fontSize,
          size: fontSize,
          font,
          color: rgb(0, 0.53, 0.71),
        }

        if (key !== 'extra') {
          page.drawText(`${key}: ${hist[key]}`, options)
        } else {
          for (let extraKey of Object.keys(hist[key])) {
            const options2: PDFPageDrawTextOptions = {
              x: 50,
              y: height - i * fontSize,
              size: fontSize,
              font,
              color: rgb(0, 0.53, 0.71),
            }
            page.drawText(`${extraKey}: ${hist[key][extraKey]}`, options2)
            i += 2
          }
          extra = true
        }
        if (!extra) {
          i += 2
        } else {
          extra = false
        }
      }
      i += 4
    }
  }
}
