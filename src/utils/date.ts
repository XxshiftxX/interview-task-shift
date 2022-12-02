export const formatDate = (date: Date) => {
  const datePart = [date.getFullYear(), date.getMonth(), date.getDate()].join(".")
  const time = date.getHours()

  return `${datePart} ${time}시`
}
