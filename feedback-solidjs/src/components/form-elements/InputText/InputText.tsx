import { splitProps } from 'solid-js';

export default function InputText(props: any) {
  return <input {...splitProps(props, [])} />;
}
