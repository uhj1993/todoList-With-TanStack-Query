import { useQuery, QueryClient, dehydrate } from '@tanstack/react-query';
import { QueryKeys } from '@src/constants/QueryKeys';
import Todo from './Todo';
import { getTodosAPI } from '@src/apis/todos';
import TodoForm from '../molecules/TodoForm';
import styled from 'styled-components';

const TodoList = () => {
  const {
    data: { data: freshTodos },
    refetch,
  } = useQuery(QueryKeys.TODOS, getTodosAPI, {
    suspense: true,
  });

  return (
    <Container>
      <div className="form">
        <TodoForm refetch={refetch} />
      </div>
      <ul className="messages">
        {freshTodos &&
          [...freshTodos]
            .reverse()
            .map(({ id, title, content, createdAt, updatedAt }) => (
              <Todo
                id={id}
                key={id}
                title={title}
                content={content}
                createdAt={createdAt}
                updatedAt={updatedAt}
                refetch={refetch}
              />
            ))}
      </ul>
    </Container>
  );
};

export default TodoList;

const Container = styled.div`
  .form {
    margin-bottom: 1rem;
  }
`;

export async function getStaticProps() {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery(QueryKeys.TODOS, getTodosAPI);

  return {
    props: {
      dehydratedState: JSON.parse(JSON.stringify(dehydrate(queryClient))),
    },
  };
}
