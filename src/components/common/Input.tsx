import './Input.scss';

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {}

export function CustomInput(props: Props) {
  return <input {...props} placeholder='0' autoComplete='off' />;
}
