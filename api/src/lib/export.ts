export const Export = instance => {
  return (constructor: Function) => {
    constructor = new instance()
    console.log(constructor)
  }
}

export const Static = () => {
  return (constructor: Function) => {
    console.log(constructor)
  }
}

export const Var = (target, propertyKey) => {
  // console.log(target)
  // console.log(propertyKey)
}

export const Method = (target, methodName, descryptor) => {
  console.dir(target)
  console.log('------------------------')
  console.log(methodName)
  console.log('------------------------')
  console.log(descryptor)
}
