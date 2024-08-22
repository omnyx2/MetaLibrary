import BookShelf from './JumpingBookShelf';

export default function JumpingBooks({mode}) {
  return (
    <div>
      <BookShelf mode={mode} />
    </div>
  );
}