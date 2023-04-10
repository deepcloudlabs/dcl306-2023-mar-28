export class Move {
  constructor(
       public guess : number,
       public evaluation : string,
       public perfectMatch : number,
       public partialMatch : number
    ) {
  }
}
