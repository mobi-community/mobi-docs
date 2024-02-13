## ✨ `Suspense`
> React v18.0에 정식 기능으로 출시하였습니다.

### 📑 Summary
`Suspense`를 통하여 작업이 끝날 때까지 렌더링을 잠시 중단시키고 미리 보여줄 컴포넌트를 렌더링 시켜 줄 수 있습니다.
```typescript
import { Suspense } from "react";

import QueryComponent from "./components/query-component";

function App() {
  return (
      <Suspense fallback={<div>Loading...</div>}>
        <PromiseComponent /> // 데이터 fetching을 하는 컴포넌트
      </Suspense>
  );
}
```

### 📖 이전에는 어떻게 사용했을까요?
클래스 컴포넌트의 경우 lifecycle 함수인 `componentDidMount()`를 사용하여 구현을 하였고, 함수형 컴포넌트의 경우 `useEffect()`를 통해 구현이 가능합니다.

```javascript
export default function TodoList() {
  const [todoList, setTodoList] = useState([]);
  // (1) 초기의 로딩 상태를 true로 만들어둡니다.
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/todos')
      .then((res) => res.json())
      .then((newTodoList) => {
        setTodoList(newTodoList);
        setLoading(false);
      })
      .catch(() => setError(true));
  }, []);

  // (3) 값을 불러오기 이전의 경우 loading 화면이 보입니다.
  if (loading) return <p>로딩중입니다.</p>;
  if (error) return <p>에러가 발생하였습니다.</p>;

  return (
    <>
      {todoList.map((todo) => (
        <div>{todo.title}</div>
      ))}
    </>
  );
}
```

이처럼 변경되는 값을 만들어주기 위해서 상태(state)를 통해 직접 보여줄 컴포넌트를 결정 할 수 있었습니다.

### 🤔 어떻게 사용할까요?
1. 데이터를 가져오는 함수를 만듭니다. 이 함수는 데이터가 없다면 promise를 반환하고 데이터가 있을 경우 todos를 반환합니다.

```javascript
export default function fetchPost() {
    let todos = null;
    const promise = fetch(
        `https://jsonplaceholder.typicode.com/todos`
    )
        .then((res) => res.json())
        .then((data) => {
            setTimeout(() => {
                todos = data;
            }, 3000);
        });
    return {
        read() {
            if (todos === null) {
                throw promise;
            } else {
                return todos;
            }
        }
    };
};
```

2. `<Suspense/>`를 이용하여 사용하는 컴포넌트를 감싸줍니다.
   
```javascript
function App() {
  return (
    <Suspense fallback={<p>로딩중입니다.</p>}>
      <TodoList fetchPost={fetchPost()} />
    </Suspense>
  );
}
```

3. props로 전달받아 실행하여 줍니다.
```javascript
import React from 'react';

export default function TodoList({ fetchPost }) {
  const todoList = fetchPost.read();

  return (
    <>
      {todoList.map((todo) => (
        <div>{todo.title}</div>
      ))}
    </>
  );
}
```

만약 fetchPost.read()의 반환 값이 Promise 타입의 경우 `<Suspense/>`의 `fallback`에 들어가있는 컴포넌트가 보여집니다.
