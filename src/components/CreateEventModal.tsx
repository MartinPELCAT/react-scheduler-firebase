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
} from "@material-ui/core";
import { DateTimePicker } from "@material-ui/pickers";
import { getTodayDate, DATEFORMAT, HOURFORMAT } from "../services/DateService";
import { addMinutes } from "date-fns/esm";
import { Formik, FormikHelpers } from "formik";
import { eventForm } from "../forms/eventForm";
import { COLORS } from "../assets/themes/materials-colors";
import { firestore } from "firebase";
import { addEvent, ScheduleEvent } from "../services/ScheduleEvent";
import { ContextEvent, IEventContext } from "../contexts/EventContext";

interface Props {
  startTimestamp: number;
}

export default class CreateEventModal extends Component<Props & DialogProps> {
  static contextType = ContextEvent;
  constructor(props: any) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

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
    let { title, startDate, endDate, description, reccurent, color } = values;
    let scheduleEvent: ScheduleEvent = {
      title,
      startTimestamp: firestore.Timestamp.fromDate(new Date(startDate)),
      endTimestamps: firestore.Timestamp.fromDate(new Date(endDate)),
      description,
      reccurent,
      color,
    };
    addEvent(scheduleEvent)
      .then((ev) => {
        (this.context as IEventContext).setScheduleEvents!([
          { ...scheduleEvent, id: ev.id },
        ]);
        this.props.onClose && this.props.onClose({}, "escapeKeyDown");
      })
      .catch((e) => {
        formikHelpers.setStatus({ apiCall: e.message });
      });
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
            color: COLORS[Math.floor(Math.random() * COLORS.length) + 1],
          }}
          initialStatus={{ apiCall: "" }}
          onSubmit={this.handleSubmit}
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
                        required
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
                    <Grid item md={12}>
                      <input
                        type="color"
                        value={values.color}
                        onChange={(t) =>
                          setFieldValue("color", t.currentTarget.value)
                        }
                      />
                    </Grid>
                  </Grid>
                </DialogContent>
                <DialogActions>
                  <Button
                    variant="contained"
                    style={{ backgroundColor: "#bdbdbd" }}
                    type="button"
                    onClick={() =>
                      this.props.onClose &&
                      this.props.onClose({}, "escapeKeyDown")
                    }
                  >
                    Cancel
                  </Button>
                  <Button
                    variant="contained"
                    style={{ backgroundColor: "#00C851" }}
                    type="submit"
                  >
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
