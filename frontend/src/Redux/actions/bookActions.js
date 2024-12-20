export const getAllBooks = (page, limit) => async (dispatch) => {
    try {
      dispatch({ type: 'getAllBooksRequest' })
  
      const url = `${process.env.BACKEND_URL}/books`;
      const params = {};
  
      if (page) {
        params.page = page;
      }
  
      if (limit) {
        params.limit = limit;
      }
  
      const { data } = await axios.get(url, {
        params,
        withCredentials: true
      })
  
      dispatch({ type: 'getAllBooksSuccess', payload: data })
      return data
    } catch (error) {
      dispatch({ type: 'getAllBooksFail', payload: error?.response?.data?.message })
    }
  }