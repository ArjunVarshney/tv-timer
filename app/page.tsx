"use client";
import useLocalPersist from "@/hooks/useLocalPersist";
import { useEffect, useState } from "react";

export default function Home() {
  const processUnit = (unit: number) => {
    if (`${unit}`.length < 2) return `0${unit}`;
    return unit;
  };

  const nth = (d: number) => {
    if (d > 3 && d < 21) return "th";
    switch (d % 10) {
      case 1:
        return "st";
      case 2:
        return "nd";
      case 3:
        return "rd";
      default:
        return "th";
    }
  };

  const days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "June",
    "July",
    "Aug",
    "Sept",
    "Oct",
    "Nov",
    "Dec",
  ];

  const [year, setYear] = useState(0);
  const [month, setMonth] = useState(0);
  const [date, setDate] = useState(0);
  const [day, setDay] = useState(0);
  const [hour, setHour] = useState(0);
  const [min, setMinute] = useState(0);
  const [sec, setSec] = useState(0);

  const [showSec, setShowSec] = useLocalPersist("show-seconds", false);
  const [showAmPm, setAmPm] = useLocalPersist("show-am-pm", true);
  const [fontWeight, setFontWeight] = useLocalPersist("font-weight", 300);
  const [subFontSize, setSubFontSize] = useLocalPersist("sub-font-size", 25);
  const [fontSize, setFontSize] = useLocalPersist("font-size", 100);
  const [showDate, setShowDate] = useLocalPersist("show-date", true);
  const [alignment, setAlignment] = useLocalPersist("alignment", "start");
  const [showYear, setShowYear] = useLocalPersist("show-year", false);
  const [showDay, setShowDay] = useLocalPersist("show-day", true);
  const [clockHorizontalAlign, setHorizontal] = useLocalPersist(
    "hor-align",
    "center"
  );
  const [clockVerticleAlign, setVerticle] = useLocalPersist(
    "ver-align",
    "center"
  );

  useEffect(() => {
    setInterval(() => {
      const date = new Date();

      const year = date.getFullYear();
      const month = date.getMonth();
      const d = date.getDate();
      const day = date.getDay();
      const hr = date.getHours();
      const min = date.getMinutes();
      const sec = date.getSeconds();
      setYear(year);
      setMonth(month);
      setDate(d);
      setDay(day);
      setHour(hr);
      setMinute(min);
      setSec(sec);
    }, 1000);
  }, []);

  return (
    <main className="min-w-[100vw] min-h-[100vh] bg-black text-white">
      {/* @ts-ignore */}
      <div onClick={() => window.setting.showModal()}>
        <svg
          className="fill-white h-[50px] w-[50px] opacity-5 absolute top-10 right-10"
          viewBox="0 0 1024 1024"
        >
          <path d="M998.4 670.72c-192-151.04 0-325.12 0-325.12l5.12-5.12-102.4-176.64-10.24 5.12c-33.28 15.36-64 20.48-92.16 20.48-148.48 0-189.44-184.32-189.44-184.32V0H407.04l-2.56 10.24c-20.48 148.48-117.76 176.64-192 176.64-48.64 0-87.04-12.8-87.04-12.8l-7.68-2.56-99.84 176.64 7.68 5.12c192 151.04 0 325.12 0 325.12l-5.12 5.12 102.4 176.64 10.24-5.12c35.84-15.36 66.56-20.48 92.16-20.48 148.48 0 189.44 181.76 189.44 181.76l2.56 7.68h202.24l2.56-10.24c20.48-145.92 117.76-174.08 192-174.08 48.64 0 87.04 12.8 87.04 12.8l7.68 2.56 102.4-176.64-12.8-7.68zM880.64 793.6c-17.92-2.56-43.52-7.68-69.12-7.68-125.44 0-209.92 66.56-238.08 186.88H453.12c-28.16-79.36-97.28-189.44-230.4-189.44-25.6 0-51.2 5.12-79.36 12.8L84.48 691.2c30.72-35.84 81.92-107.52 76.8-194.56-2.56-58.88-28.16-112.64-79.36-161.28L140.8 230.4c17.92 2.56 43.52 7.68 69.12 7.68 125.44 0 209.92-66.56 238.08-186.88h120.32c23.04 64 84.48 189.44 230.4 189.44 25.6 0 51.2-5.12 79.36-12.8l61.44 104.96c-30.72 35.84-81.92 107.52-79.36 194.56 2.56 58.88 28.16 112.64 79.36 161.28L880.64 793.6z" />
          <path d="M512 294.4c-125.44 0-227.84 102.4-227.84 227.84S386.56 750.08 512 750.08s227.84-102.4 227.84-227.84S637.44 294.4 512 294.4zm0 404.48c-97.28 0-176.64-79.36-176.64-176.64S414.72 345.6 512 345.6s176.64 79.36 176.64 176.64S609.28 698.88 512 698.88z" />
        </svg>
      </div>

      <dialog id="setting" className="modal">
        <form method="dialog" className="modal-box">
          <h3 className="font-bold text-lg mb-3">Settings</h3>
          <div className="my-2">
            <label className="label">
              <span className="label-text">Clock Position</span>
            </label>
            <select
              className="select w-full select-bordered"
              onChange={(e) => {
                setHorizontal(e.target.value.split("-")[0]);
                setVerticle(e.target.value.split("-")[1]);
              }}
              defaultValue={clockHorizontalAlign + "-" + clockVerticleAlign}
            >
              <option>start-start</option>
              <option>start-center</option>
              <option>start-end</option>
              <option>center-start</option>
              <option>center-center</option>
              <option>center-end</option>
              <option>end-start</option>
              <option>end-center</option>
              <option>end-end</option>
            </select>
          </div>
          <div className="my-2">
            <label className="label">
              <span className="label-text">Alignment</span>
            </label>
            <select
              className="select w-full select-bordered"
              onChange={(e) => setAlignment(e.target.value)}
              defaultValue={alignment}
            >
              <option>start</option>
              <option>center</option>
              <option>end</option>
            </select>
          </div>
          <div className="my-2">
            <label className="label">
              <span className="label-text">Font Size</span>
            </label>
            <input
              type="range"
              min={20}
              max={1000}
              className="range mt-2"
              name="font-size"
              defaultValue={fontSize}
              step={1}
              onChange={(e) => setFontSize(parseInt(e.target.value))}
            />
          </div>
          <div className="my-2">
            <label className="label">
              <span className="label-text">Font Weight</span>
            </label>
            <input
              type="range"
              min={100}
              max={900}
              className="range mt-2"
              name="font-weight"
              step={100}
              onChange={(e) => setFontWeight(parseInt(e.target.value))}
            />
          </div>
          <div className="my-2 flex justify-between">
            <label className="label">
              <span className="label-text">Show am(or pm)</span>
            </label>
            <input
              type="checkbox"
              name="show-am-pm"
              className="toggle"
              defaultChecked={showAmPm}
              onChange={(e) => setAmPm((prev: boolean) => !prev)}
            />
          </div>
          <div className="my-2 flex justify-between">
            <label className="label">
              <span className="label-text">Show Year</span>
            </label>
            <input
              type="checkbox"
              name="show-year"
              className="toggle"
              defaultChecked={showYear}
              onChange={(e) => setShowYear((prev: boolean) => !prev)}
            />
          </div>
          <div className="my-2 flex justify-between">
            <label className="label">
              <span className="label-text">Show Date</span>
            </label>
            <input
              type="checkbox"
              name="show-date"
              className="toggle"
              defaultChecked={showDate}
              onChange={(e) => setShowDate((prev: boolean) => !prev)}
            />
          </div>
          <div className="my-2 flex justify-between">
            <label className="label">
              <span className="label-text">Show Day</span>
            </label>
            <input
              type="checkbox"
              name="show-day"
              className="toggle"
              defaultChecked={showDay}
              onChange={(e) => setShowDay((prev: boolean) => !prev)}
            />
          </div>
          <div className="my-2">
            <label className="label">
              <span className="label-text">Sub Font Size</span>
            </label>
            <input
              type="range"
              min={10}
              max={300}
              className="range mt-2"
              name="font-size"
              defaultValue={subFontSize}
              step={1}
              onChange={(e) => setSubFontSize(parseInt(e.target.value))}
            />
          </div>
          <div className="my-2 flex justify-between">
            <label className="label">
              <span className="label-text">Show Seconds</span>
            </label>
            <input
              type="checkbox"
              name="show-seconds"
              className="toggle"
              defaultChecked={showSec}
              onChange={(e) => setShowSec((prev: boolean) => !prev)}
            />
          </div>
          <div className="modal-action">
            <button className="btn">Close</button>
          </div>
        </form>
      </dialog>

      <div
        id="clock"
        className="flex min-h-[100vh] min-w-[100vw]"
        style={{
          alignItems: clockHorizontalAlign,
          justifyContent: clockVerticleAlign,
        }}
      >
        <div
          className="inline-flex flex-col gap-2"
          style={{
            alignItems: alignment,
          }}
        >
          <div
            className="flex gap-1 leading-none"
            style={{ fontSize: `${fontSize}px`, fontWeight: fontWeight }}
          >
            <div>
              {hour === 0 ? "00" : processUnit(hour > 12 ? hour - 12 : hour)}
            </div>
            <div>:</div>
            <div>{min === 0 ? "00" : processUnit(min)}</div>
            {showSec && (
              <>
                <div>:</div>
                <div>{sec === 0 ? "00" : processUnit(sec)}</div>
              </>
            )}
            {showAmPm && <div>{hour < 12 ? "am" : "pm"}</div>}
          </div>

          <div className="flex gap-3" style={{ fontSize: `${subFontSize}px` }}>
            {showDate && (
              <>
                <div>
                  {date}
                  {nth(date)}
                </div>
                <div>{months[month]}</div>
                {showYear && <div>{year}</div>}
              </>
            )}

            {showDay && showDate && <div>|</div>}

            {showDay && <div>{days[day]}</div>}
          </div>
        </div>
      </div>
    </main>
  );
}
