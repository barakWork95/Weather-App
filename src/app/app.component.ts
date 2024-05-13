import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnInit,
} from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent implements OnInit {
  apiKey = 'ba6f4be44ae86e6ad57c18f75e9bd77e';
  apiUrl = 'https://api.openweathermap.org/data/2.5/weather?&units=metric&q=';
  imgName: string = 'clouds';
  isNothingFound: boolean = false;
  city: string = '';
  temp: string = '';
  humidity: string = '';
  wind: string = '';

  get imgUrl(): string {
    return `../assets/images/${this.imgName}.png`;
  }

  constructor(private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.updateImgUrl('clouds');
    this.checkWeather('tel aviv');
  }

  async checkWeather(city: string) {
    const res = await fetch(this.apiUrl + city + `&appid=${this.apiKey}`);
    let data = await res.json();
    this.isNothingFound = data.cod === '404' ? true : false;
    if (this.isNothingFound) return;

    this.city = data?.name;
    this.temp = Math.round(data?.main?.temp).toString();
    this.humidity = data?.main?.humidity;
    this.wind = data?.wind?.speed;

    switch (data?.weather[0].main) {
      case 'Clouds':
        this.updateImgUrl('clouds');
        break;

      case 'Clear':
        this.updateImgUrl('clear');
        break;

      case 'Rain':
        this.updateImgUrl('rain');
        break;

      case 'Drizzle':
        this.updateImgUrl('drizzle');
        break;

      case 'Mist':
        this.updateImgUrl('mist');
        break;
    }
  }

  updateImgUrl(newName: string): void {
    this.imgName = newName;
    this.cdr.detectChanges();
  }
}
