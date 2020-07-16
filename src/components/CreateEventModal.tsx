import React, { Component } from "react";
import {
  Dialog,
  DialogTitle,
  DialogProps,
  DialogContent,
  Grid,
  TextField,
  DialogActions,
  Button,
  Input,
} from "@material-ui/core";
import { DateTimePicker } from "@material-ui/pickers";
import { getTodayDate, DATEFORMAT, HOURFORMAT } from "../services/DateService";
import { addMinutes } from "date-fns/esm";
import { Formik, FormikHelpers } from "formik";
import { eventForm } from "../forms/eventForm";

interface Props {
  startTimestamp: number;
}

export default class CreateEventModal extends Component<Props & DialogProps> {
  constructor(props: any) {
    super(props);
    this.validateForm = this.validateForm.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  validateForm = (values: any) => {};

  handleSubmit = (
    values: {
      startDate: number;
      endDate: number;
      title: string;
      description: string;
      reccurent: boolean;
      color: string;
    },
    formikHelpers: FormikHelpers<{
      startDate: number;
      endDate: number;
      title: string;
      description: string;
      reccurent: boolean;
      color: string;
    }>
  ) => {
    // event.preventDefault();
    // this.validateForm()
    //   .then(() => {
    //     //TODO: Add to firebase
    //   })
    //   .catch(() => {
    //     //TODO: Thow error
    //   });
  };

  render() {
    let { startTimestamp, ...dialogProps } = this.props;
    return (
      <Dialog maxWidth={"sm"} fullWidth {...dialogProps}>
        <DialogTitle>Ajouter un évenement</DialogTitle>
        <Formik
          validationSchema={eventForm}
          validateOnChange={false}
          initialValues={{
            startDate: this.props.startTimestamp,
            endDate: addMinutes(this.props.startTimestamp, 30).getTime(),
            title: "",
            description: "",
            reccurent: false,
            color: "#fff",
          }}
          initialStatus={{ apiCall: "" }}
          onSubmit={this.handleSubmit}
          validate={this.validateForm}
        >
          {({
            values,
            errors,
            handleSubmit,
            handleChange,
            setFieldValue,
            status,
            isSubmitting,
          }) => (
            <>
              <form noValidate onSubmit={handleSubmit}>
                <DialogContent>
                  <Grid container spacing={2}>
                    <Grid item md={12}>
                      <TextField
                        fullWidth
                        label="Title"
                        value={values.title}
                        onChange={handleChange}
                        name="title"
                        error={!!errors.title}
                        helperText={errors.title}
                      />
                    </Grid>
                    <Grid item md={6}>
                      <DateTimePicker
                        autoOk
                        fullWidth
                        variant="inline"
                        hideTabs
                        format={`${DATEFORMAT} ${HOURFORMAT}`}
                        ampm={false}
                        minutesStep={5}
                        value={values.startDate}
                        onChange={(date) =>
                          setFieldValue("startDate", date!.getTime())
                        }
                        name="startDate"
                        allowKeyboardControl={false}
                        minDate={getTodayDate()}
                        error={!!errors.startDate}
                        helperText={errors.startDate}
                      />
                    </Grid>
                    <Grid item md={6}>
                      <DateTimePicker
                        autoOk
                        fullWidth
                        variant="inline"
                        hideTabs
                        format={`${DATEFORMAT} ${HOURFORMAT}`}
                        ampm={false}
                        minutesStep={5}
                        value={values.endDate}
                        onChange={(date) => {
                          setFieldValue("endDate", date!.getTime());
                        }}
                        name="endDate"
                        allowKeyboardControl={false}
                        minDate={values.startDate}
                        error={!!errors.endDate}
                        helperText={errors.endDate}
                      />
                    </Grid>
                    <Grid item md={12}>
                      <TextField
                        multiline
                        fullWidth
                        label="Description"
                        rows={5}
                        value={values.description}
                        onChange={handleChange}
                        name="description"
                        error={!!errors.description}
                        helperText={errors.description}
                      />
                    </Grid>
                    <Grid item>
                      <Input type="color" fullWidth />
                    </Grid>
                  </Grid>
                </DialogContent>
                <DialogActions>
                  <Button variant="contained" color="secondary" type="button">
                    Cancel
                  </Button>
                  <Button variant="contained" color="primary" type="submit">
                    Save
                  </Button>
                </DialogActions>
              </form>
            </>
          )}
        </Formik>
      </Dialog>
    );
  }
}
