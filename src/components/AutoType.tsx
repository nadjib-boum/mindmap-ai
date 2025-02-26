type AutoTypeProps = {
  text: string;
}

const AutoType = ({ text }: AutoTypeProps) => {

  return (
    text.split("").map((letter, index) => (
      <span key={letter + index} className={`fade-in`} style={{ "--delay": `${index * .03}s` } as any}>{letter}</span>
    ))
  );

}

export default AutoType;