import React from "react";
import { ClipLoader } from "react-spinners";

function Spinner({
  loading = true,
  size = 40,
  color = "#fb923c",
  message = "",
}) {
  return (
    <div className="flex items-center justify-center">
      <ClipLoader color={color} loading={loading} size={size} />
      {message && <span className="ml-3 text-sm text-zinc-600">{message}</span>}
    </div>
  );
}

export default Spinner;
