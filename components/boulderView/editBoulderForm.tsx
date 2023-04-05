import { fetcher } from "../../lib/http";
import { Boulder, Grade, HoldType, Wall } from "../../lib/types";
import { useAppContext } from "../../pages/_app";
import useSWR, { useSWRConfig } from "swr";
import Loader from "../loader/loader";
import { Form } from "../form/_form";
import axios from "axios";
import { z } from "zod";
import { Input } from "../input/input";
import { Select } from "../select/_select";
import { HoldType as HoldTypeComponent } from "../holdType/holdType";
import { selectValidation } from "../../lib/selectValidation";

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

  const { mutate } = useSWRConfig();

  if (!data || !walls || !grades || !holdTypes) {
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
          getOptionLabel: (option: Grade) => option.name,
          options: grades,
          component: Select,
        },
        {
          name: "holdType",
          label: "Hold type",
          onChangeValidate: selectValidation(),
          getOptionLabel: (option: HoldType) => (
            <div style={{ display: "flex", alignItems: "center" }}>
              <HoldTypeComponent image={option.image} />
              <span
                style={{
                  marginLeft: 8,
                }}
              >
                {option.name}
              </span>
            </div>
          ),
          options: holdTypes,
          component: Select,
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
