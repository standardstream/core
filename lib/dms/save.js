class DMSSave {

  constructor(body, Model) {
    console.log('we gonna save', body)

    var model = new Model(body)
  }

}

export default DMSSave
