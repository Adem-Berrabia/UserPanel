if (localStorage.getItem("isSmall") === "yes") {
  sidebarid.classList.add("small-sidebar");
} else {
  sidebarid.classList.remove("small-sidebar");
}

const toggleside = () => {
  if (localStorage.getItem("isSmall") === "yes") {
    localStorage.setItem("isSmall", "no");
    sidebarid.classList.remove("small-sidebar");
  } else {
    localStorage.setItem("isSmall", "yes");
    sidebarid.classList.add("small-sidebar");
  }
};
