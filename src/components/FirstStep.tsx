// Step1.tsx
import React from 'react';
import classes from './FirstStep.module.css'
import { useForm, SubmitHandler } from 'react-hook-form';

interface Step1Props {
  onNext: (data: { firstName: string }) => void;
}

interface Step1Form {
  firstName: string;
  lastName: string;
  motherName: string;
  fatherName: string;
  email: string;
  contact: number;
  address: string;
}

const FirstStep: React.FC<Step1Props> = ({ onNext }) => {
  const { register, handleSubmit, formState: { errors } } = useForm<Step1Form>();

  const onSubmit: SubmitHandler<Step1Form> = (data) => {
    onNext(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={classes.container}>
      <div>
        <h2 className={classes.h2}>Step 1</h2>
        <label className={classes.label}>
          First Name:
          <input className={classes.input}type="text" {...register('firstName', { required: 'This field is required' })} />
          {errors.firstName && <p>{errors.firstName.message}</p>}
        </label>
        <label className={classes.label}>
          Last Name:
          <input className={classes.input}type="text" {...register('firstName', { required: 'This field is required' })} />
          {errors.lastName && <p>{errors.lastName.message}</p>}
        </label>
        <label className={classes.label}>
          Mother's Name:
          <input className={classes.input}type="text" {...register('firstName', { required: 'This field is required' })} />
          {errors.motherName && <p>{errors.motherName.message}</p>}
        </label>
        <label className={classes.label}>
          Father's Name:
          <input className={classes.input}type="text" {...register('firstName', { required: 'This field is required' })} />
          {errors.fatherName && <p>{errors.fatherName.message}</p>}
        </label>
        <label className={classes.label}>
          Contact Number:
          <input className={classes.input}type="number" {...register('firstName', { required: 'This field is required' })} />
          {errors.contact && <p>{errors.contact.message}</p>}
        </label>
        <label className={classes.label}>
          Email:
          <input className={classes.input}type="email" {...register('firstName', { required: 'This field is required' })} />
          {errors.email && <p>{errors.email.message}</p>}
        </label>
        <label className={classes.label}>
          Address:
          <input className={classes.input}type="text" {...register('firstName', { required: 'This field is required' })} />
          {errors.address && <p>{errors.address.message}</p>}
        </label>
      </div>
      <button type="submit" className={classes.button}>Next</button>
    </form>
  );
};

export default FirstStep;
