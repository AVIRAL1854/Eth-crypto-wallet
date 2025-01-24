import { QRCodeCanvas } from "qrcode.react";
import { useState } from "react";

const QRCodeGenerator = ({ QRtext }) => {
  return (
    <div className="flex flex-col items-center gap-4 p-6  bg-black">
      <QRCodeCanvas value={QRtext} size={256} className="border-2"/>
    </div>
  );
};

export default QRCodeGenerator;
