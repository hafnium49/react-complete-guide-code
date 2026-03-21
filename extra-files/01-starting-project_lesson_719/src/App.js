import React from 'react';

import AddUser from './components/Users/AddUser';
import UsersList from './components/Users/UsersList';

/*
  TUTOR'S GUIDANCE:
  "Resolving Undefined Map Faults"
  By dropping the `<UsersList />` natively outside and vertically below `<AddUser />`, we beautifully
  establish sibling relationships managed by a root orchestrator object!
  
  It is incredibly critical that we pass the empty array flag `[]` directly across to our custom 
  `users` prop. If we didn't declare this, our child component's `.map()` operator would crash 
  since it essentially tries mapping across a 'null/undefined' layout variable! By mapping the default array 
  safely here upfront, no errors trigger structurally!
*/
function App() {
  return (
    <div>
      <AddUser />
      <UsersList users={[]} />
    </div>
  );
}

export default App;
