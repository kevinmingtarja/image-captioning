import { models } from "@hypermode/functions-as";
import { Model } from "@hypermode/models-as";


@json
class ImageCaptioningInput {
  instances!: string[];
}


@json
class ImageCaptioningOutput {
  predictions!: string[];
}

export class ImageCaptioningModel extends Model<
  ImageCaptioningInput,
  ImageCaptioningOutput
> {
  createInput(instances: string[]): ImageCaptioningInput {
    return <ImageCaptioningInput>{ instances };
  }
}

export function captionImage(b64image: string): string {
  console.log(`payload: ${b64image}`);
  console.log(`size: ${b64image.length}`);

  const model = models.getModel<ImageCaptioningModel>("image-captioning");
  const input = model.createInput([b64image]);
  const output = model.invoke(input).predictions[0];
  return output;
}
