"use client";

import React from "react";
import { Button } from "@/components/ui/button";

type ButtonGroupProps = {
  onClick: (color: "red" | "green") => void;
};

const ButtonGroup = ({ onClick }: ButtonGroupProps) => {
  return (
    <div className="mt-24 flex space-x-4">
      <Button
        color="red"
        onClick={() => onClick("red")}
        className="bg-red-500 hover:bg-red-600"
      >
        左
      </Button>
      <Button
        color="green"
        onClick={() => onClick("green")}
        className="bg-green-500 hover:bg-green-600"
      >
        右
      </Button>
    </div>
  );
};

export default ButtonGroup;
