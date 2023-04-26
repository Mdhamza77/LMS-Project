import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureMockStore from 'redux-mock-store';
import App from './App';

const mockStore = configureMockStore();
const store = mockStore({});

jest.mock("react-router-dom", () => ({
    ...jest.requireActual("react-router-dom"),
    useNavigate: () => jest.fn(),
  }));

describe('MyComponent', () => {
  it('should render without errors', () => {
    render(
      <Provider store={store}>
        <App />
      </Provider>
    );
    // Your assertions go here
  });
});
