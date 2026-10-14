import React, { useCallback } from 'react'
import { set, unset } from 'sanity'
import { Stack, Button, Card, Text, Box } from '@sanity/ui'
import { AddIcon, TrashIcon } from '@sanity/icons'

export function TableInput({ value, onChange }: any) {
  const rows = value?.rows || []

  // ✅ PASTE HANDLER - Auto converts from Word/Google Docs/Excel
  const handlePaste = useCallback(
    (e: React.ClipboardEvent) => {
      e.preventDefault()

      // Try HTML paste first (Word, Google Docs, Excel)
      const html = e.clipboardData.getData('text/html')
      if (html) {
        const parser = new DOMParser()
        const doc = parser.parseFromString(html, 'text/html')
        const tableEl = doc.querySelector('table')

        if (tableEl) {
          const parsedRows = Array.from(tableEl.querySelectorAll('tr')).map(
            (tr) => ({
              _type: 'tableRow',
              _key: crypto.randomUUID(),
              cells: Array.from(tr.querySelectorAll('td, th')).map(
                (cell) => cell.innerText?.trim() || ''
              ),
            })
          )

          onChange(
            set({
              _type: 'table',
              rows: parsedRows,
            })
          )
          return
        }
      }

      // Fallback: TSV paste (from Excel/Sheets direct copy)
      const text = e.clipboardData.getData('text/plain')
      if (text) {
        const parsedRows = text
          .trim()
          .split('\n')
          .map((line) => ({
            _type: 'tableRow',
            _key: crypto.randomUUID(),
            cells: line.split('\t').map((cell) => cell.trim()),
          }))

        onChange(
          set({
            _type: 'table',
            rows: parsedRows,
          })
        )
      }
    },
    [onChange]
  )

  const addRow = useCallback(() => {
    const colCount = rows[0]?.cells?.length || 3
    const newRow = {
      _type: 'tableRow',
      _key: crypto.randomUUID(),
      cells: Array(colCount).fill(''),
    }
    onChange(set({ _type: 'table', rows: [...rows, newRow] }))
  }, [rows, onChange])

  const removeRow = useCallback(
    (rowIndex: number) => {
      const updated = rows.filter((_: any, i: number) => i !== rowIndex)
      onChange(updated.length ? set({ _type: 'table', rows: updated }) : unset())
    },
    [rows, onChange]
  )

  const updateCell = useCallback(
    (rowIndex: number, cellIndex: number, val: string) => {
      const updated = rows.map((row: any, ri: number) => {
        if (ri !== rowIndex) return row
        const cells = [...row.cells]
        cells[cellIndex] = val
        return { ...row, cells }
      })
      onChange(set({ _type: 'table', rows: updated }))
    },
    [rows, onChange]
  )

  const addColumn = useCallback(() => {
    const updated = rows.map((row: any) => ({
      ...row,
      cells: [...(row.cells || []), ''],
    }))
    onChange(set({ _type: 'table', rows: updated }))
  }, [rows, onChange])

  const removeColumn = useCallback(() => {
    const updated = rows.map((row: any) => ({
      ...row,
      cells: row.cells.slice(0, -1),
    }))
    onChange(set({ _type: 'table', rows: updated }))
  }, [rows, onChange])

  return (
    <Stack space={3}>
      {/* ✅ Paste Zone */}
      <Card
        padding={4}
        radius={2}
        tone="primary"
        border
        onPaste={handlePaste}
        style={{ cursor: 'text', outline: 'none' }}
        tabIndex={0}
      >
        <Text size={1} muted>
          📋 Click here and paste a table from Word / Google Docs / Excel
        </Text>
      </Card>

      {/* Table Editor */}
      {rows.length > 0 && (
        <Card padding={3} radius={2} border>
          <div style={{ overflowX: 'auto' }}>
            <table style={{ borderCollapse: 'collapse', width: '100%' }}>
              <tbody>
                {rows.map((row: any, rowIndex: number) => (
                  <tr key={row._key || rowIndex}>
                    {row.cells?.map((cell: string, cellIndex: number) => (
                      <td
                        key={cellIndex}
                        style={{ border: '1px solid #ccc', padding: '4px' }}
                      >
                        <input
                          value={cell}
                          onChange={(e) =>
                            updateCell(rowIndex, cellIndex, e.target.value)
                          }
                          style={{
                            width: '100%',
                            border: 'none',
                            outline: 'none',
                            padding: '4px',
                            // ✅ Bold for first row (header)
                            fontWeight: rowIndex === 0 ? 'bold' : 'normal',
                            background: rowIndex === 0 ? '#f5f5f5' : 'white',
                          }}
                        />
                      </td>
                    ))}
                    <td style={{ padding: '4px' }}>
                      <button
                        type="button"
                        onClick={() => removeRow(rowIndex)}
                        style={{ color: 'red', cursor: 'pointer' }}
                      >
                        ✕
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Row/Column Controls */}
          <Box marginTop={3}>
            <Stack space={2} direction="row">
              <Button
                icon={AddIcon}
                text="Add Row"
                tone="primary"
                onClick={addRow}
                mode="ghost"
              />
              <Button
                icon={AddIcon}
                text="Add Column"
                tone="positive"
                onClick={addColumn}
                mode="ghost"
              />
              <Button
                icon={TrashIcon}
                text="Remove Column"
                tone="critical"
                onClick={removeColumn}
                mode="ghost"
              />
            </Stack>
          </Box>
        </Card>
      )}
    </Stack>
  )
}