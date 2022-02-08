import { render, RenderResult } from '@testing-library/react';
import { Provider } from 'react-redux';
import App from '../../App';
import { store } from '../../app/store';
import githubReducer, {
  GithubState,
  star,
  filter,
} from './githubSlice';

describe('githubStar reducer', () => {
  const initialState: GithubState = {
    value: [],
    status: 'loading',
    filtered: false
  };
  const starState: GithubState = {
    value: [{id: "123", star:false}],
    status: 'loading',
    filtered: false
  };
  const filterState: GithubState = {
    value: [{id: "123", star:true},{id: "234", star:false}],
    status: 'loading',
    filtered: false
  };
  
  it('should handle initial state', () => {
    expect(githubReducer(undefined, { type: 'unknown' })).toEqual({
      value: [],
      status: 'loading',
      filtered: false
    });
  });

  it('should handle star action', () => {
    const actual = githubReducer(starState, star("123"));
    expect(actual.value).toEqual([{id: "123", star:true}]);
    
    
  });


  it('should handle filter action', () => {
    const actual = githubReducer(filterState, filter());
    expect(actual.filtered).toEqual( true);
  });

});
