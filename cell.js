function createCell(value = 0) {
    
  const cell = document.createElement("button");
  cell.classList.add("cell");

  function update() {

    if (value == -1) cell.textContent = "0";
    else if (value == 1) cell.textContent = "X";
    else cell.textContent = "";

    cell.disabled = value != 0;
  }

  update();

  return {
    el: cell,

    get value() {
      return value;
    },

    set value(v) {
      value = v;
      update();
    },

    addWinner() {
        cell.classList.add("winner")
        update()
    },

    removeWinner() {
        cell.classList.remove("winner")
        update()
    }

  };
}
