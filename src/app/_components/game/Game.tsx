"use client";

import { useState, useEffect } from "react";
import ChoicesButtonGroup from "./ChoicesButtonGroup";
import RecordDisplay from "./RecordDisplay";

const Game = () => {
  const [record, setRecord] = useState<number>(1); // 1 -> 1/2, 2 -> 1/4, etc.
  const [bestRecord, setBestRecord] = useState<number>(1);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);

  // オプション: ローカルストレージからベスト記録を取得
  useEffect(() => {
    const storedBestRecord = localStorage.getItem("bestRecord");
    if (storedBestRecord) {
      setBestRecord(Number(storedBestRecord));
    }
  }, []);

  // オプション: ベスト記録が更新されたらローカルストレージに保存
  useEffect(() => {
    localStorage.setItem("bestRecord", bestRecord.toString());
  }, [bestRecord]);

  const handleButtonClick = () => {
    const correct = Math.random() < 0.5; // 1/2の確率で正解
    setIsCorrect(correct);

    if (correct) {
      const newRecord = record + 1;
      setRecord(newRecord);
      // ベスト記録更新時に更新
      if (newRecord > bestRecord) {
        setBestRecord(newRecord);
      }
    } else {
      setRecord(1); // 不正解時にリセット
    }
  };

  return (
    <div className="flex flex-col items-center">
      <ChoicesButtonGroup onClick={handleButtonClick} />
      {isCorrect !== null && (
        <div
          className={`mt-4 text-lg ${isCorrect ? "text-green-600" : "text-red-600"}`}
        >
          {isCorrect ? "正解!" : "不正解!"}
        </div>
      )}
      <RecordDisplay currentRecord={record} bestRecord={bestRecord} />
    </div>
  );
};

export default Game;
