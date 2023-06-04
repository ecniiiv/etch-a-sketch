class Button {
  constructor(element, initialStatus, preventModify) {
    this.element = element;
    this.initialStatus = initialStatus;
    this.preventModify = preventModify;

    this.activestatus = false;
  }

  changeStatus(setInactiveTarget) {
    if (this.initialStatus === "off") {
      this.activestatus = false;
      setBackgroundColor(this.element, this.activestatus);
      this.element.addEventListener("click", () => {
        this.activestatus = true;
        setBackgroundColor(this.element, this.activestatus);
        setInactiveTarget.forEach((obj) => {
          obj.forEach((i) => {
            if (i.element.id !== this.element.id) {
              i.activestatus = false;
              setBackgroundColor(i.element, i.activestatus);
            }
          });
        });
      });
    } else if (this.initialStatus === "on") {
      this.activestatus = true;
      setBackgroundColor(this.element, this.activestatus);
    } else if (this.initialStatus === "toggle") {
      this.element.addEventListener("click", () => {
        this.activestatus = !this.activestatus;
        setBackgroundColor(this.element, this.activestatus);
        setInactiveTarget.forEach((obj) => {
          obj.forEach((i) => {
            if (i.element.id !== this.element.id) {
              i.activestatus = false;
              setBackgroundColor(i.element, i.activestatus);
            }
          });
        });
      });
    } else if (this.initialStatus === "preventMod") {
      this.element.addEventListener("click", () => {
        setInactiveTarget.forEach((obj) => {
          obj.forEach((i) => {
            if (i.element.id !== this.element.id) {
              i.activestatus = false;
              setBackgroundColor(i.element, i.activestatus);
            }
          });
        });
      });
    } else {
      this.element.addEventListener("click", () => {
        this.activestatus = true;
        setBackgroundColor(this.element, this.activestatus);
        setInactiveTarget.forEach((obj) => {
          obj.forEach((i) => {
            if (i.element.id !== this.element.id) {
              i.activestatus = false;
              setBackgroundColor(i.element, i.activestatus);
            }
          });
        });
      });
    }

    function setBackgroundColor(target, condintional) {
      if (condintional) {
        target.style.backgroundColor = "#85edab";
        target.style.color = "#333";
      } else {
        target.style.backgroundColor = "transparent";
        target.style.color = "white";
      }
    }
  }

  listenFor(event, callback) {
    this.element.addEventListener(event, callback);
  }
}
