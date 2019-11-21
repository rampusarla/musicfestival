import { MusicFestivalService } from "./service/musicFestival.service";
import { Component, OnInit } from "@angular/core";
import { Band } from "./model/Band.model";
import { RecordLabel } from "./model/RecordLabel.model";
import { Festival } from "./model/Festival.model";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.less"]
})
export class AppComponent implements OnInit {
  title = "Music Festival Details";
  eadata: any = [];
  dataRetrieved = false;

  bands: Band[] = [];
  recordLabels: any = [];

  constructor(private eaMusicFestivalService: MusicFestivalService) {}

  ngOnInit(): void {
    this.eaMusicFestivalService.getData().subscribe((data: any) => {
      if (data !== null && data !== undefined) {
        this.dataRetrieved = true;
        this.eadata = data;
        this.arrangeData();
      } else {
        this.dataRetrieved = false;
      }
    });
  }

  private transFormData() {
    this.sortData(this.recordLabels);
    this.recordLabels.forEach((recordLabel: any) => {
      const bands = recordLabel.bands;
      if (bands) {
        this.sortData(bands);
        bands.forEach((band: any) => {
          const festivals = band.festivals;
          if (festivals) {
            this.sortData(festivals);
          }
        });
      }
    });
  }

  private sortData(data) {
    data.sort((a, b) => (a.name > b.name ? 1 : -1));
  }

  private arrangeData() {
    this.eadata.forEach((festival: any) => {
      const festivalName = festival.name;
      const bands = festival.bands;
      bands.forEach((band: any) => {
        band.recordLabel = band.recordLabel
          ? band.recordLabel
          : "No Record Label";
        const existingRecordLabel: RecordLabel = this.recordLabels.find(
          r => r.name === band.recordLabel
        );
        if (!existingRecordLabel) {
          const newRecordLabel = new RecordLabel();
          newRecordLabel.name = band.recordLabel;
          newRecordLabel.bands = [];

          const newBand = new Band();
          newBand.name = band.name;

          const newFestival = new Festival();
          newFestival.name = festivalName;
          newBand.festivals = [];
          newBand.festivals.push(newFestival);

          newRecordLabel.bands.push(newBand);
          this.recordLabels.push(newRecordLabel);
        } else {
          const existingBand = existingRecordLabel.bands.find(
            b => b.name === band.name
          );
          if (!existingBand) {
            const newBand = new Band();
            newBand.name = band.name;
            newBand.festivals = [];

            const newFestival = new Festival();
            newFestival.name = festivalName;

            if (festivalName !== undefined) {
              newBand.festivals.push(newFestival);
            }
            existingRecordLabel.bands.push(newBand);
          } else {
            existingBand.festivals.push(festivalName);
          }
        }
      });
    });
    this.transFormData();
  }
}
