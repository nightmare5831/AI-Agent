"use client";

export default function AuthRequiredSection() {
  return (
    <div className="page-content-wrapper">
      <div className="px-2 lg:px-[8rem]">
        <h1> Auth Required </h1>
        <p> This section is only visible to authenticated users. </p>
      </div>
    </div>
  );
}
