const INCREMENT = 'increment';
export const ASYNC_INCREMENT = 'asyncIncrement';

export default {
  state: {
    count: 0
  },
  mutations: {
    [INCREMENT] (state) {
      state.count++
    }
  },
  actions: {
    [ASYNC_INCREMENT] (context){
      setTimeout(() => {
        context.commit('increment')
      }, 1000)
    }
  }
}
