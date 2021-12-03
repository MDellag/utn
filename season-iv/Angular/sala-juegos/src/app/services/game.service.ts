import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import {
  AngularFirestore,
  AngularFirestoreCollection,
} from '@angular/fire/compat/firestore'
import { Game, TriviaParams } from '../interfaces/game'

@Injectable({
  providedIn: 'root',
})
export class GameService {
  private gameRef: AngularFirestoreCollection<Game>
  private readonly trivialApi: string = 'https://opentdb.com/api.php'

  constructor(
    private readonly firestore: AngularFirestore,
    private readonly http: HttpClient
  ) {
    this.gameRef = this.firestore.collection('games')
  }

  getTrivialData(params: TriviaParams) {
    return this.http.get(this.trivialApi, {
      params: {
        amount: params.amount,
        type: params.type,
        difficulty: params.difficulty,
      },
    })
  }

  async updateScore(gameData: Game) {
    const gameExists = await this.gameRef.ref
      .where('id', '==', gameData.id)
      .where('game', '==', gameData.game)
      .get()

    if (!gameExists.docs[0]?.data()) {
      this.gameRef.doc(Date.now().toString()).set(gameData)
    } else {
      const id = gameExists.docs[0].id
      this.gameRef
        .doc(id)
        .update({ score: gameData.score, updatedAt: gameData.updatedAt })
    }
  }

  async getScore(gameData: Game): Promise<Game> {
    try {
      const gameExists = await this.gameRef.ref
        .where('id', '==', gameData.id)
        .where('game', '==', gameData.game)
        .get()

      return gameExists.docs[0]?.data()
    } catch (err) {
      throw 'GAME_DATA_DOES_NOT_EXISTS'
    }
  }
}
