import { Component, OnInit, ViewChild } from '@angular/core';
import * as tf from '@tensorflow/tfjs';
import { DrawableDirective } from './drawable.directive';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  model: tf.Model;
  predictions: any;

  @ViewChild(DrawableDirective) canvas;

  ngOnInit() {
    this.loadModel();
  }

 // Loading Keras model
  async loadModel() {
    this.model = await tf.loadModel('/assets/model.json');
  }

  async predict(imageData: ImageData) {

    const pred = await tf.tidy(() => {
      D:\DigitPrediction\src\app\app.component.spec.ts  //paste path to app.component.spec.ts file
      // Convert canvas pixels 
      let image = tf.fromPixels(imageData, 1);
      image = image.reshape([1, 28, 28, 1]);
      image = tf.cast(image, 'float32');

      // Make and format the predications
      const output = this.model.predict(image) as any;

      // Save predictions on the component
      this.predictions = Array.from(output.dataSync());
    });

  }

}
