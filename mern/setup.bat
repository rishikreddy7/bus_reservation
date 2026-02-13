@echo off

echo Setting up Backend...
cd backend
call npm install
echo Backend setup complete!

echo.
echo Setting up Frontend...
cd ..\frontend
call npm install
echo Frontend setup complete!

echo.
echo =========================================
echo Setup complete! To start the project:
echo.
echo Terminal 1 - Backend:
echo   cd backend
echo   npm run dev
echo.
echo Terminal 2 - Frontend:
echo   cd frontend
echo   npm start
echo.
echo Make sure MongoDB is running before starting the backend!
echo =========================================
pause
