import { Checkbox } from "@radix-ui/react-checkbox";
import { FormControl, FormField, FormItem, FormLabel } from "./ui/form";
import { Want } from "@/utils/binding";

export interface ProjectDetailDisplayCardProps {
  wanted_jobs: any;
  fields: any;
}
export function ProjectDetailDisplayCard(props: ProjectDetailDisplayCardProps) {
  return (
    <>
      <div className="flex flex-col"></div>
      <div className="grid lg:grid-cols-4 xl:grid-cols-5 grid-cols-3 gap-4">
        {props.fields.map((item, index) => (
          <div
            key={index}
            className="flex flex-row items-start space-x-3 space-y-0"
          >
            <Checkbox checked={true} />
            <FormLabel className="text-sm font-normal">asd</FormLabel>
          </div>
        ))}
      </div>
    </>
  );
}
