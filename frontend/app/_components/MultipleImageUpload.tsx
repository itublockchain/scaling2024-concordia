"use client";
import * as React from "react";

import { Card, CardContent } from "@/app/_components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/app/_components/ui/carousel";
import { SingleImageUpload } from "./SingleImageUpload";
import { useRef, useState } from "react";
import { Button } from "./ui/button";

export const MemoMultipleImageUpload = React.memo(
  MultipleImageUpload,
  (prevProps, nextProps) => {
    return prevProps.returnImages === nextProps.returnImages;
  },
);

interface MultipleImageUploadComponentProps {
  returnImages?: (files: any[]) => void;
}

export function MultipleImageUpload(props: MultipleImageUploadComponentProps) {
  console.log("rendered");
  // let [cardCount, setCardCount] = useState<number>(1);
  let [images, setImage] = useState<Array<string>>([""]);

  let content = useRef(null);

  function addCard() {
    setImage((prev) => {
      let data = [...prev];
      data.push("");
      return data;
    });
    console.log("asd", images);
    props.returnImages(images);
  }

  function deleteImageCard() {
    props.returnImages(images);
    setImage((prev) => {
      let data = [...prev];
      data.pop();
      return data;
    });
  }

  return (
    <div>
      <Carousel
        opts={{
          align: "start",
        }}
        className="w-full "
      >
        <CarouselContent ref={content}>
          {Array.from({ length: images?.length }).map((_, index) => (
            <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
              <div className="p-1">
                <Card>
                  <CardContent className="flex aspect-square items-center justify-center p-6">
                    <SingleImageUpload
                      returnImage={(file) => {
                        setImage((prev) => {
                          prev[index] = file;
                          return prev;
                        });
                        props.returnImages(images);
                      }}
                      deleteImageCallback={() => {}}
                      key={index}
                    />
                    <span className="text-3xl font-semibold">{index + 1}</span>
                  </CardContent>
                </Card>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
      <div className="flex justify-center gap-20">
        <Button onClick={deleteImageCard} type="button">
          remove
        </Button>
        <Button onClick={addCard} type="button">
          add
        </Button>
      </div>
    </div>
  );
}
