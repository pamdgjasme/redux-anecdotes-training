const anecdotesAtStart = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

const getId = () => (100000 * Math.random()).toFixed(0)

const asObject = (anecdote) => {
  return {
    content: anecdote,
    id: getId(),
    votes: 0
  }
}

const initialState = anecdotesAtStart.map(asObject)

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'ADD_VOTE':
      const { id } = action.payload;
      const anecdoteToChange = state.find(a => a.id == id);

      if (anecdoteToChange) {
        const changedAnecdote = { 
          ...anecdoteToChange, 
          votes: anecdoteToChange.votes + 1
        };
        return state.map(anecdote =>
          anecdote.id !== id ? anecdote : changedAnecdote 
        );
      } else {
        console.error(`Anecdote: ID-${id} not found`);
        return state;
      }
    case 'ADD_ANECDOTE': {
      const { content } = action.payload;
      const newAnecdote = {
        content,
        id: getId(),
        votes: 0
      };

      return [...state, newAnecdote];
    }
    default:
      console.error(`Action is invalid. Please, try again.`);
      return state;
  }
}

export const addVote = (id) => {
  return {
    type: 'ADD_VOTE',
    payload: { id }
  };
};

export const addAnecdote = (content) => {
  console.log(content)
  return {
    type: 'ADD_ANECDOTE',
    payload: { content }
  };
};

export default reducer