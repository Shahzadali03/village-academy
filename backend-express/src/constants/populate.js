export const CLASS_WITH_SESSION = {
  path: 'classes',
  populate: { path: 'session' },
};

export const STUDENT_WITH_CLASS = {
  path: 'student',
  populate: CLASS_WITH_SESSION,
};

export const FEE_WITH_STUDENT = {
  path: 'student',
  populate: CLASS_WITH_SESSION,
};
