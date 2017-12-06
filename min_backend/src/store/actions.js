import CALL_API from '../api'

export function action ({ commit }, mutations, request) {
  const { url, method, params } = request

  commit(mutations[0])

  return CALL_API(url, method, params).then(response => {
    if (!response) return

    commit(mutations[1], response)

    return response
  }).catch(err => {
    commit(mutations[2])

    throw err
  })
}

const actions = {}

export default actions
