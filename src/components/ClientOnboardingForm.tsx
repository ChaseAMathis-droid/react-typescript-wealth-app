import React from 'react';
import { useForm, useFieldArray, Controller } from 'react-hook-form';

type Beneficiary = {
  id?: string;
  name: string;
  relation: string;
  sharePct: number;
};

type Address = {
  line1: string;
  line2?: string;
  city: string;
  state: string;
  zip: string;
};

export type OnboardingFormData = {
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  dob: string; // ISO date
  ssn?: string;
  address: Address;
  initialDeposit: number;
  riskTolerance: 'conservative' | 'balanced' | 'aggressive';
  investmentPreferences: string[];
  beneficiaries: Beneficiary[];
  acceptTerms: boolean;
};

const defaultValues: OnboardingFormData = {
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  dob: '',
  ssn: '',
  address: { line1: '', line2: '', city: '', state: '', zip: '' },
  initialDeposit: 0,
  riskTolerance: 'balanced',
  investmentPreferences: [],
  beneficiaries: [],
  acceptTerms: false,
};

export const ClientOnboardingForm: React.FC = () => {
  const {
    register,
    control,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<OnboardingFormData>({ defaultValues, mode: 'onBlur' });

  const { fields, append, remove } = useFieldArray({ control, name: 'beneficiaries' });

  const onSubmit = async (data: OnboardingFormData) => {
    // In a real app you'd POST to your API here. Keep it async to simulate I/O.
    console.log('Submitting onboarding data', data);
    return new Promise((res) => setTimeout(res, 500));
  };

  const totalShare = (arr: Beneficiary[]) => arr.reduce((s, b) => s + (Number(b.sharePct) || 0), 0);

  const watchBeneficiaries = watch('beneficiaries');

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate>
      <h2>Client Onboarding</h2>

      <label>
        First name
        <input {...register('firstName', { required: 'First name is required', minLength: { value: 2, message: 'Too short' } })} />
        {errors.firstName && <span>{errors.firstName.message}</span>}
      </label>

      <label>
        Last name
        <input {...register('lastName', { required: 'Last name is required' })} />
        {errors.lastName && <span>{errors.lastName.message}</span>}
      </label>

      <label>
        Email
        <input
          {...register('email', {
            required: 'Email required',
            pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: 'Invalid email' },
          })}
        />
        {errors.email && <span>{errors.email.message}</span>}
      </label>

      <label>
        Phone
        <input {...register('phone', { pattern: { value: /^\+?[0-9\-\s()]{7,}$/, message: 'Invalid phone' } })} />
        {errors.phone && <span>{errors.phone.message}</span>}
      </label>

      <label>
        Date of birth
        <input type="date" {...register('dob', { required: 'DOB required', validate: (v) => {
          if (!v) return 'DOB required';
          const age = (Date.now() - new Date(v).getTime()) / (1000 * 60 * 60 * 24 * 365.25);
          return age >= 18 || 'Client must be 18+';
        } })} />
        {errors.dob && <span>{errors.dob.message}</span>}
      </label>

      <label>
        SSN (last 4)
        <input {...register('ssn', { pattern: { value: /^\d{4}$/, message: 'Enter last 4 digits only' } })} />
        {errors.ssn && <span>{errors.ssn.message}</span>}
      </label>

      <fieldset>
        <legend>Address</legend>
        <label>
          Line 1
          <input {...register('address.line1', { required: 'Address required' })} />
          {errors.address?.line1 && <span>{(errors.address.line1 as any).message}</span>}
        </label>
        <label>
          Line 2
          <input {...register('address.line2')} />
        </label>
        <label>
          City
          <input {...register('address.city', { required: 'City required' })} />
          {errors.address?.city && <span>{(errors.address.city as any).message}</span>}
        </label>
        <label>
          State
          <input {...register('address.state', { required: 'State required' })} />
        </label>
        <label>
          ZIP
          <input {...register('address.zip', { required: 'ZIP required', pattern: { value: /^\d{5}(-\d{4})?$/, message: 'Invalid ZIP' } })} />
          {errors.address?.zip && <span>{(errors.address.zip as any).message}</span>}
        </label>
      </fieldset>

      <label>
        Initial deposit
        <input type="number" step="0.01" {...register('initialDeposit', { valueAsNumber: true, min: { value: 0, message: 'Must be >= 0' } })} />
        {errors.initialDeposit && <span>{errors.initialDeposit.message}</span>}
      </label>

      <label>
        Risk tolerance
        <select {...register('riskTolerance')}>
          <option value="conservative">Conservative</option>
          <option value="balanced">Balanced</option>
          <option value="aggressive">Aggressive</option>
        </select>
      </label>

      <fieldset>
        <legend>Investment preferences</legend>
        <label>
          <input type="checkbox" value="equities" {...register('investmentPreferences')} /> Equities
        </label>
        <label>
          <input type="checkbox" value="fixed_income" {...register('investmentPreferences')} /> Fixed income
        </label>
        <label>
          <input type="checkbox" value="esg" {...register('investmentPreferences')} /> ESG
        </label>
      </fieldset>

      <fieldset>
        <legend>Beneficiaries</legend>
        <div>
          {fields.map((f, idx) => (
            <div key={f.id} style={{ border: '1px solid #eee', padding: 8, marginBottom: 8 }}>
              <label>
                Name
                <input {...register(`beneficiaries.${idx}.name` as const, { required: 'Name required' })} />
              </label>
              <label>
                Relation
                <input {...register(`beneficiaries.${idx}.relation` as const)} />
              </label>
              <label>
                Share %
                <input type="number" step="0.01" {...register(`beneficiaries.${idx}.sharePct` as const, { valueAsNumber: true, min: 0, max: 100 })} />
              </label>
              <button type="button" onClick={() => remove(idx)}>Remove</button>
            </div>
          ))}
        </div>
        <div>
          <button type="button" onClick={() => append({ name: '', relation: '', sharePct: 0 })}>Add beneficiary</button>
        </div>
        <div>Total share: {totalShare(watchBeneficiaries || [])}%</div>
      </fieldset>

      <label>
        <input type="checkbox" {...register('acceptTerms', { required: 'You must accept terms' })} /> I accept the terms
        {errors.acceptTerms && <span>{errors.acceptTerms.message}</span>}
      </label>

      <div>
        <button type="submit" disabled={isSubmitting}>Create client</button>
      </div>
    </form>
  );
};

export default ClientOnboardingForm;
