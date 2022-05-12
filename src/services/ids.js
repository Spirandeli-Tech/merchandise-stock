const generateID = () => {
  const id = Math.floor(Date.now() * Math.random()).toString(36)
  return id
}

export default generateID