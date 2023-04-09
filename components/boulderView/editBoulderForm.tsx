import { fetcher } from "../../lib/http";
import { Boulder, Grade, HoldType, Setter, Tag, Wall } from "../../lib/types";
import useSWR, { useSWRConfig } from "swr";
import { Form } from "../form/form";
import axios from "axios";
import { z } from "zod";
import { Input } from "../input/input";
import { Select } from "../select/select";
import { selectValidation } from "../../lib/selectValidation";
import { MultiSelect } from "../select/multiSelect";
import { selectOptionLabels } from "../../lib/selectOptionLabels";
import { Loader } from "../loader/loader";
import { useAppContext } from "../../pages/_app";

type EditBoulderFormProps = {
  id: number;
};

export function EditBoulderForm({ id }: EditBoulderFormProps) {
  const { currentLocation } = useAppContext();

  const { data } = useSWR<Boulder[]>(
    `/api/${currentLocation?.url}/boulders/${id}`,
    fetcher
  );

  const { data: walls } = useSWR<Wall[]>(
    `/api/${currentLocation?.url}/walls`,
    fetcher
  );

  const { data: grades } = useSWR<Grade[]>(
    `/api/${currentLocation?.url}/grades`,
    fetcher
  );

  const { data: holdTypes } = useSWR<HoldType[]>(
    `/api/${currentLocation?.url}/holdtypes`,
    fetcher
  );

  const { data: tags } = useSWR<Tag[]>(
    `/api/${currentLocation?.url}/boulder-tags`,
    fetcher
  );

  const { data: setters } = useSWR<Setter[]>(
    `/api/${currentLocation?.url}/setters`,
    fetcher
  );

  const { mutate } = useSWRConfig();

  if (!data || !walls || !grades || !holdTypes || !tags || !setters) {
    return <Loader />;
  }

  return (
    <Form
      data={data}
      submitLabel={"Update"}
      onSubmit={async (values) => {
        await axios.put(`/api/${currentLocation?.url}/boulders/${id}`, values);

        mutate(`/api/${currentLocation?.url}/boulders/${id}`);
        mutate(`/api/${currentLocation?.url}/boulders`);
      }}
      fields={[
        {
          name: "name",
          label: "Name",
          type: "text",
          onBlurValidate: z.string().nonempty(),
          component: Input,
        },
        {
          name: "startWall",
          label: "Start wall",
          onChangeValidate: selectValidation(),
          getOptionLabel: (option: Wall) => option.name,
          options: walls,
          component: Select,
        },
        {
          name: "endWall",
          label: "End wall",
          onChangeValidate: selectValidation(),
          getOptionLabel: (option: Wall) => option.name,
          options: walls,
          component: Select,
        },
        {
          name: "grade",
          label: "Grade",
          onChangeValidate: selectValidation(),
          getOptionLabel: selectOptionLabels.grade,
          options: grades,
          component: Select,
        },
        {
          name: "holdType",
          label: "Hold type",
          onChangeValidate: selectValidation(),
          getOptionLabel: selectOptionLabels.holdType,
          options: holdTypes,
          component: Select,
        },
        {
          name: "tags",
          label: "Tags",
          getOptionLabel: selectOptionLabels.tag,
          options: tags,
          component: MultiSelect,
        },
        {
          name: "setters",
          label: "Setters",
          getOptionLabel: (option: Setter) => option.username,
          options: setters,
          component: MultiSelect,
        },
        {
          name: "points",
          label: "Points",
          type: "number",
          onBlurValidate: z.number().gt(0),
          component: Input,
        },
        {
          name: "status",
          label: "Status",
          onChangeValidate: z.string().nonempty(),
          getOptionLabel: (option) => option,
          options: ["active", "inactive"],
          component: Select,
        },
      ]}
    />
  );
}
