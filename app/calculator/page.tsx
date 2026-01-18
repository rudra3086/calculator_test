'use client';

import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';

interface Calculation {
  id: string;
  expression: string;
  result: string;
  createdAt: string;
}

export default function CalculatorPage() {
  const [display, setDisplay] = useState('0');
  const [expression, setExpression] = useState('');
  const [history, setHistory] = useState<Calculation[]>([]);
  const router = useRouter();

  const fetchHistory = useCallback(async () => {
    try {
      const response = await fetch('/api/calculate');
      if (response.status === 401) {
        router.push('/login');
        return;
      }
      const data = await response.json();
      setHistory(data.calculations || []);
    } catch (error) {
      console.error('Failed to fetch history:', error);
    }
  }, [router]);

  useEffect(() => {
    fetchHistory();
  }, [fetchHistory]);

  const handleNumberClick = (num: string) => {
    if (display === '0') {
      setDisplay(num);
      setExpression(num);
    } else {
      setDisplay(display + num);
      setExpression(expression + num);
    }
  };

  const handleOperatorClick = (op: string) => {
    setDisplay(display + ' ' + op + ' ');
    setExpression(expression + op);
  };

  const handleClear = () => {
    setDisplay('0');
    setExpression('');
  };

  const handleEquals = async () => {
    try {
      // Evaluate expression safely
      const result = eval(expression);
      setDisplay(result.toString());

      // Save to database
      await fetch('/api/calculate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          expression: display,
          result: result.toString(),
        }),
      });

      // Refresh history
      fetchHistory();

      setExpression(result.toString());
    } catch {
      setDisplay('Error');
      setExpression('');
    }
  };

  const handleLogout = async () => {
    await fetch('/api/auth/logout', { method: 'POST' });
    router.push('/');
  };

  const buttons = [
    '7', '8', '9', '/',
    '4', '5', '6', '*',
    '1', '2', '3', '-',
    '0', '.', '=', '+'
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-100 p-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800">Calculator</h1>
          <button
            onClick={handleLogout}
            className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition duration-200"
          >
            Logout
          </button>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Calculator */}
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <div className="bg-gray-100 p-4 rounded-lg mb-4 text-right text-2xl font-mono text-gray-800 min-h-[60px] flex items-center justify-end break-all">
              {display}
            </div>

            <div className="grid grid-cols-4 gap-2">
              {buttons.map((btn) => (
                <button
                  key={btn}
                  onClick={() => {
                    if (btn === '=') handleEquals();
                    else if (['+', '-', '*', '/'].includes(btn)) handleOperatorClick(btn);
                    else handleNumberClick(btn);
                  }}
                  className={`p-4 rounded-lg font-semibold text-lg transition duration-200 ${
                    btn === '='
                      ? 'bg-green-500 hover:bg-green-600 text-white'
                      : ['+', '-', '*', '/'].includes(btn)
                      ? 'bg-blue-500 hover:bg-blue-600 text-white'
                      : 'bg-gray-200 hover:bg-gray-300 text-gray-800'
                  }`}
                >
                  {btn}
                </button>
              ))}
            </div>

            <button
              onClick={handleClear}
              className="w-full mt-4 bg-red-500 hover:bg-red-600 text-white font-semibold py-3 rounded-lg transition duration-200"
            >
              Clear
            </button>
          </div>

          {/* History */}
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">History</h2>
            <div className="space-y-2 max-h-[500px] overflow-y-auto">
              {history.length === 0 ? (
                <p className="text-gray-500 text-center py-8">No calculations yet</p>
              ) : (
                history.map((calc) => (
                  <div
                    key={calc.id}
                    className="bg-gray-50 p-3 rounded-lg border border-gray-200"
                  >
                    <div className="text-gray-800 font-mono">
                      {calc.expression} = {calc.result}
                    </div>
                    <div className="text-xs text-gray-500 mt-1">
                      {new Date(calc.createdAt).toLocaleString()}
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
