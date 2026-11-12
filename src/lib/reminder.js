// When the next preventive visit is due: a year from now. Most plans cover one preventive visit a year.
export function nextVisitDate(now = new Date()) {
  return new Date(now.getFullYear() + 1, now.getMonth(), now.getDate())
}
