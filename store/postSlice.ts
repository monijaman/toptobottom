const post = { title: 'lorem', body: 'ipsum' }

const addPost = createAsyncThunk(
  'posts/addPost',
  async (post, { rejectWithValue }) => {
    try {
      const response = await fetch(
        'https://jsonplaceholder.typicode.com/posts',
        {
          method: 'POST',
          body: JSON.stringify(post),
          header: {
            'Content-Type': 'application/json',
          },
        }
      )
      const data = await response.json()
      return data
    } catch (err) {
      // You can choose to use the message attached to err or write a custom error
      return rejectWithValue('Opps there seems to be an error')
    }
  }
)