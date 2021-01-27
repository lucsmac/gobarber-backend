import FakeAppointmentRepository from '@modules/appointments/repositories/fakes/FakeAppointmentsRepository';
import CreateAppointment from '@modules/appointments/services/CreateAppointmentService';
import AppError from '@shared/errors/AppError';

describe('CreateAppointment', () => {
  it('should be able to create appointment', async () => {
    const fakeAppointmentsRepository = new FakeAppointmentRepository();
    const createAppointment = new CreateAppointment(fakeAppointmentsRepository);

    const date = new Date();
    const provider_id = '12345678';

    const appointment = await createAppointment.execute({ date, provider_id });

    expect(appointment).toHaveProperty('id');
    expect(appointment.provider_id).toBe(provider_id);
  });

  it('should not be able to create two appointments on the same time', async () => {
    const fakeAppointmentsRepository = new FakeAppointmentRepository();
    const createAppointment = new CreateAppointment(fakeAppointmentsRepository);

    const date = new Date();
    const provider_id = '12345678';

    await createAppointment.execute({ date, provider_id });

    expect(
      createAppointment.execute({ date, provider_id }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
