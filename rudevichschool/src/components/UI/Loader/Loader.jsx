import React from "react";
import cl from "./Loader.module.css";

const Loader = () => {
  return (
    <div className={cl.downloading}>
      <div className={cl.downloading_cogs}>
        <div className={cl.dekopesam}>
          <div className={cl.accusation} />
          <div className={cl.accusation} />
          <div className={cl.accusation} />
          <div className={cl.firstHole} />
        </div>
        <div className={cl.bekopesam}>
          <div className={cl.secondPart} />
          <div className={cl.secondPart} />
          <div className={cl.secondPart} />
          <div className={cl.secondHole} />
        </div>
        <div className={cl.cekopesam}>
          <div className={cl.thirdPart} />
          <div className={cl.thirdPart} />
          <div className={cl.thirdPart} />
          <div className={cl.thirdHole} />
        </div>
        <p>Загрузка...</p>
      </div>
    </div>
  );
};

export default Loader;
