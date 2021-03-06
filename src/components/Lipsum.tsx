import React from "react";

export default function Lipsum({ paragraphs = 5 }: { paragraphs?: number }) {
  const elements = [];
  for (let i = 0; i < paragraphs; i++) {
    elements.push(
      <p key={i}>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent mattis
        mi ac justo tempor, ut tincidunt nibh ornare. Proin neque diam, laoreet
        in eros quis, viverra congue nisl. Vestibulum consectetur sit amet nibh
        bibendum scelerisque. Donec faucibus convallis ante vitae iaculis.
        Vivamus ultricies placerat orci ut iaculis. Praesent eu tellus posuere,
        vehicula sem quis, scelerisque justo. Curabitur fringilla nisi sed ipsum
        ultrices lobortis. Morbi convallis, elit eu sagittis fermentum, nisi
        quam viverra elit, quis mattis risus dolor sit amet purus. Vivamus
        efficitur est eget risus pretium, nec bibendum enim pharetra. Praesent
        diam arcu, tempus a euismod facilisis, vestibulum nec neque. Maecenas
        vitae lacus eget massa faucibus suscipit a et nulla. Mauris eu ipsum
        diam. Sed euismod gravida cursus.
      </p>
    );
  }
  return <>{elements}</>;
}
