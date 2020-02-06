const gettersSteps = {
  step1: state => state.Steps.step1,
  step2: state => state.Steps.step2,
  step3: state => state.Steps.step3
}

const getters = Object.assign(
  {},
  gettersSteps
)

export default getters
