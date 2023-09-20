1. clone repo from here `https://github.com/davvar/kanban-board-server`
2. install npm packages `npm install`. Make sure to be inside the `kanban-board-server` folder
3. run `npm run develop` to start the server
4. open `http://localhost:1337` in your browser and make sure the server is running

If you see the following message `Welcome to Strapi` then the server is running
let's move to the next steps Loreta JAN =)

1. inside the `vite-project` folder run `npm install axios`
2. after installation open `package.json` file verify that `axios` is added inside the `dependencies`
3. If so then we are good to go, take a deep breath and drink some water
4. If water is not available then just take a deep breath and let's continue
5. create a new folder inside the `src` folder and name it `api`
6. create 3 files inside the `api` folder and name them `tasks.ts`, `columns.ts` and `index.ts`
   at this point your folder structure should look like this:
   ```
    src
      - api
        - tasks.ts
        - columns.ts
        - index.ts
   ```
7. inside the `src/api/index.ts` file add the following code:
   ```ts
    export const = BASE_URL = 'http://localhost:1337';
   ```
8. inside the `src/api/tasks.ts` file add the following code:

   ```ts
   import axios from 'axios';
   import { BASE_URL } from './index';

   export const getTasks = async () => {
     // you should pass "Authorization" header with the value of "Bearer <token>" to get the tasks
     // below is the token you should use
     // Bearer ce61d5677a4016fd4cd205c86026ff8a39876d3c48e0f882b8b25ef96465a63379821bb30cecc4998104def6dcb5322527864f34c795f097ca0fafcfbf58d1e889c1ab048ca6a667a877297f1af06101ab9998f5af72638791a032373c37004b5f80397a86ff3561bd2bc3f8ba949f86f8fb5e7da75c46fa85faff052690a327
     const { data } = await axios.get(`${BASE_URL}/tasks`);
     return data;
   };
   ```

9. from this url `https://flaviocopes.com/axios-send-authorization-header/` you can learn how to add the `Authorization` header to the request
10. after reading the article you should be able to add the `Authorization` header to the request and get the tasks
11. open `App.tsx` file and paste below code to test the `getTasks` function

```tsx
import { useEffect } from 'react';
import './App.css';
import KanbanBoard from './components/KanbanBoard';
import { getTasks } from './api/tasks';

function App() {
  useEffect(() => {
    getTasks()
      .then(tasks => {
        console.log('Loreta is a champion and Tasks fetched', tasks);
      })
      .catch(err => {
        console.error('Failed to fetch tasks', err.message);
      });
  }, []);

  return <KanbanBoard />;
}

export default App;
```

12. after adding the code above you should see the following message in the browser console `Tasks fetched`
13. if Loreta is a champion then we can move to the next step. For more info call +37499389919
