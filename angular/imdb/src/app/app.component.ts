import {Component, OnInit} from '@angular/core';
import { ImdbService } from './imdb.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [ImdbService]
})

export class AppComponent implements  OnInit{
  title = 'Movie Search';
  from : Number = 1970;
  to : Number = 1979 ;
  genres ;
  movies ;
  genre : String = "Comedy";
  ngOnInit(): void {
    this.imdbService.getGenres().subscribe(genres => {
      console.log(genres);
      this.genres=genres;
    });
  }
  constructor(private imdbService: ImdbService){
  }
  search = function(){
    this.imdbService.findMovies(this.from,this.to,this.genre).subscribe(movies => {
      console.log(movies);
      this.movies=movies;
    });
  }
}
