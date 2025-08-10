import { Radio, RadioGroup, RadioProps } from "@heroui/react";

const AppRadio: React.FC<RadioProps> = (props: RadioProps) => {
  return <Radio size="sm" {...props} />;
};

export { RadioGroup };
export { AppRadio as Radio };
